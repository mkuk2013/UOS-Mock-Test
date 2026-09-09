from http.server import HTTPServer, SimpleHTTPRequestHandler
from socketserver import ThreadingMixIn
import os
import sys

# Change directory to this script's directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class ThreadingSimpleServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Route alias: /admin -> admin.html
        if self.path == '/admin' or self.path == '/admin/':
            self.send_response(302)
            self.send_header('Location', '/admin.html')
            self.end_headers()
            return
        super().do_GET()

    def end_headers(self):
        # Prevent aggressive caching in development
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    port = 8080
    server = ThreadingSimpleServer(('0.0.0.0', port), CustomHandler)
    print(f"UOS Dev Server running at http://localhost:{port}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        sys.exit(0)
