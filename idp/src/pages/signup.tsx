type SignupProps = {
  error?: string
}

export const SignupPage = ({ error }: SignupProps) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Signup</title>
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
            margin: 0 0 20px;
            font-size: 24px;
          }
          label {
            display: block;
            margin-top: 14px;
            font-size: 14px;
            font-weight: 600;
          }
          input {
            box-sizing: border-box;
            width: 100%;
            margin-top: 6px;
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font: inherit;
          }
          button {
            width: 100%;
            margin-top: 20px;
            padding: 10px 12px;
            border: 0;
            border-radius: 6px;
            background: #2563eb;
            color: #ffffff;
            font: inherit;
            font-weight: 700;
            cursor: pointer;
          }
          .error {
            margin: 0 0 14px;
            color: #b91c1c;
            font-size: 14px;
          }
        `}</style>
      </head>
      <body>
        <main>
          <h1>Signup</h1>
          {error ? <p class="error">{error}</p> : null}
          <form method="post" action="/signup">
            <label for="id">ID</label>
            <input id="id" name="id" type="text" autocomplete="username" required />

            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
            />

            <label for="name">ユーザ名</label>
            <input id="name" name="name" type="text" autocomplete="name" required />

            <button type="submit">Create</button>
          </form>
        </main>
      </body>
    </html>
  )
}
