export const TopPage = () => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>FedCM RP Demo</title>
        <style>{`
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: system-ui, sans-serif;
            background: #f7f7f8;
            color: #1f2937;
          }
          main {
            width: min(420px, calc(100vw - 32px));
            padding: 24px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #ffffff;
          }
          h1 {
            margin: 0;
            font-size: 24px;
          }
        `}</style>
      </head>
      <body>
        <main>
          <h1>FedCM RP Demo</h1>
        </main>
        <script src="/static/top.js"></script>
      </body>
    </html>
  );
};
