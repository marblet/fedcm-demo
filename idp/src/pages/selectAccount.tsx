type Account = {
  id: string
  name: string
}

type SelectAccountProps = {
  accounts: Account[]
  error?: string
}

export const SelectAccountPage = ({ accounts, error }: SelectAccountProps) => {
  const currentAccount = accounts[0]
  const switchableAccounts = accounts.slice(1)

  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Select Account</title>
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
            width: min(460px, calc(100vw - 32px));
            padding: 24px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #ffffff;
          }
          h1 {
            margin: 0 0 16px;
            font-size: 24px;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 12px 0;
            border-top: 1px solid #e5e7eb;
          }
          li:first-child {
            border-top: 0;
          }
          p {
            margin: 0 0 20px;
          }
          .name {
            font-weight: 700;
          }
          .id {
            margin-top: 2px;
            color: #6b7280;
            font-size: 14px;
          }
          .current {
            color: #15803d;
            font-size: 14px;
            font-weight: 700;
            white-space: nowrap;
          }
          .error {
            color: #b91c1c;
          }
          button {
            padding: 8px 10px;
            border: 0;
            border-radius: 6px;
            background: #2563eb;
            color: #ffffff;
            font: inherit;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            white-space: nowrap;
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
          <h1>Select Account</h1>
          {error ? <p class="error">{error}</p> : null}
          {!currentAccount ? (
            <p>有効なセッションがありません。</p>
          ) : (
            <ul>
              <li>
                <div>
                  <div class="name">{currentAccount.name}</div>
                  <div class="id">{currentAccount.id}</div>
                </div>
                <span class="current">ログイン中</span>
              </li>
              {switchableAccounts.map((account) => (
                <li>
                  <div>
                    <div class="name">{account.name}</div>
                    <div class="id">{account.id}</div>
                  </div>
                  <form method="post" action="/select_account">
                    <input type="hidden" name="userId" value={account.id} />
                    <button type="submit">このユーザに切り替える</button>
                  </form>
                </li>
              ))}
            </ul>
          )}
          <p>
            <a href="/">トップへ</a>
          </p>
        </main>
      </body>
    </html>
  )
}
