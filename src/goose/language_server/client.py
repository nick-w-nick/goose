import asyncio
from collections import defaultdict
import threading
from contextlib import contextmanager

from goose.language_server.base import LanguageServer
import goose.language_server.types as multilspy_types
from goose.language_server.config import Language
from typing import Any, Callable, Iterator, List, TypeVar

T = TypeVar("T")


def langserver_request(func: Callable[[T, Any], Any]) -> Callable[[T, Any], Any]:
    def wrapper(self: "LanguageServerClient", file_path: str, line: int, column: int) -> List[T]:
        language = Language.from_file_path(file_path)
        for language_server in self.language_servers[language]:
            language_server_name = language_server.__class__.__name__
            loop = self.server_loops[language_server_name]
            result = asyncio.run_coroutine_threadsafe(
                func(self, language_server, file_path, line, column), loop
            ).result(timeout=5)
            if result:
                return result

    return wrapper


# @ensure_all_methods_implemented(LanguageServer)
class LanguageServerClient:
    """
    The SyncLanguageServer class provides a language-agnostic interface to the Language Server Protocol.
    It communicates with Language Servers for different programming languages.
    """

    def __init__(self) -> None:
        """
        Initialize SyncLanguageServer with a dictionary of language servers.
        Each language server is run on its own daemon thread.
        """
        self.language_servers = defaultdict(list)
        self.server_loops = {}
        self.loop_threads = {}

    def register_language_server(self, language_server: LanguageServer) -> None:
        # assert that lang servers doesnt contain an instance of this language server
        for existing_lang_server_list in self.language_servers.values():
            for existing_lang_server in existing_lang_server_list:
                assert existing_lang_server.__class__ != language_server.__class__

        supported_languages = language_server.supported_languages
        for language in supported_languages:
            self.language_servers[language].append(language_server)

        loop = asyncio.new_event_loop()
        thread = threading.Thread(target=loop.run_forever, daemon=True)
        self.server_loops[language_server.__class__.__name__] = loop
        self.loop_threads[language_server.__class__.__name__] = thread
        thread.start()

    @contextmanager
    def start_servers(self) -> Iterator["LanguageServerClient"]:
        """
        Starts all language server processes and connects to them.
        Each server is run on its own thread and event loop.

        :yield: The SyncLanguageServer instance with all servers started.
        """
        ctxs = {}
        # Start all language servers
        for _, language_servers in self.language_servers.items():
            for language_server in language_servers:
                language_server_name = language_server.__class__.__name__
                loop = self.server_loops[language_server_name]
                ctx = language_server.start_server()
                ctxs[language_server_name] = ctx
                asyncio.run_coroutine_threadsafe(ctx.__aenter__(), loop=loop).result()

        # Yield the context for using the servers
        yield self

        # Stop all language servers and shut down their loops
        for language_name, _ in ctxs.items():
            loop = self.server_loops[language_name]
            ctx = ctxs[language_name]
            asyncio.run_coroutine_threadsafe(ctx.__aexit__(None, None, None), loop=loop).result()

            # Stop the event loop and join the thread
            loop.call_soon_threadsafe(loop.stop)
            self.loop_threads[language_name].join()

    @langserver_request
    def request_definition(
        self, language_server: LanguageServer, file_path: str, line: int, column: int
    ) -> List[multilspy_types.Location]:
        """
        Request definition from a specific language server.

        Args:
            file_path (str): The absolute file path.
            line (int): The line number.
            column (str): The column number.

        Return:
            (list) A list of locations where the symbol is defined.
        """
        return language_server.request_definition(file_path, line, column)

    @langserver_request
    def request_references(
        self, language_server: LanguageServer, file_path: str, line: int, column: int
    ) -> List[multilspy_types.Location]:
        """
        Request references from a specific language server.
        Args:
            file_path (str): The absolute file path.
            line (int): The line number.
            column (str): The column number.
        Return:
            (list) A list of locations where the symbol is referenced.
        """
        return language_server.request_references(file_path, line, column)

    @langserver_request
    def hover(self, language_server: LanguageServer, file_path: str, line: int, column: int) -> multilspy_types.Hover:
        """
        Request hover information from a specific language server.
        Args:
            file_path (str): The absolute file path.
            line (int): The line number.
            column (str): The column number.
        Return:
            (Hover) The hover information.
        """
        return language_server.hover(file_path, line, column)
