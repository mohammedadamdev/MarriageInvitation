#!/usr/bin/env python3
"""Local dev server — serves fresh files (no cache)."""
import http.server
import socketserver

PORT = 8080


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"http://localhost:{PORT}/")
        httpd.serve_forever()
