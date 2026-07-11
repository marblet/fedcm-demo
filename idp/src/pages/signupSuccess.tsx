export const SignupSuccessPage = () => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Signup Success</title>
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
            width: min(360px, calc(100vw - 32px));
            padding: 24px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #ffffff;
          }
          h1 {
            margin: 0 0 16px;
            font-size: 24px;
          }
          p {
            margin: 0 0 20px;
          }
          a {
            color: #2563eb;
            font-weight: 700;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `}</style>
      </head>
      <body>
        <main>
          <h1>Signup Success</h1>
          <p>ユーザ登録が完了しました。</p>
          <a href="/login">ログインページへ</a>
        </main>
      </body>
    </html>
  )
}
