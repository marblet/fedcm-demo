# FedCM demo

IdP と RP をそれぞれローカル HTTPS で起動する手順です。

- IdP: `https://idp.local:3000`
- RP: `https://rp.local:3001`

## 1. mkcert をセットアップする

`mkcert` が未インストールの場合はインストールします。

macOS:

```sh
brew install mkcert
brew install nss # Firefox でも確認する場合
```

Windows:

```powershell
winget install FiloSottile.mkcert
```

mkcert のローカル CA をインストールします。

```sh
make mkcert-install
```

Windows の Chrome で確認する場合は、Chrome を動かしている Windows 側の信頼ストアに mkcert のローカル CA が入っている必要があります。
WSL で `make mkcert-install` を実行しても Windows 側には反映されないため、Windows の PowerShell で次を実行してください。

```powershell
mkcert -install
```

WSL で発行した証明書をそのまま使う場合は、WSL 側の mkcert CA を Windows に信頼させます。

```sh
mkcert -CAROOT
```

表示されたディレクトリにある `rootCA.pem` を Windows の「信頼されたルート証明機関」にインポートしてください。
別の方法として、Windows 側で `mkcert -install` を実行したあと、Windows 側の mkcert で `certs/idp.local.pem` と `certs/rp.local.pem` を作り直しても構いません。

## 2. ローカル証明書を発行する

リポジトリ直下で証明書用ディレクトリを作り、`idp.local` と `rp.local` の証明書を発行します。

```sh
make certs
```

## 3. hosts を設定する

`idp.local` と `rp.local` がローカルマシンを向くように、利用している OS の hosts ファイルへ追記します。

macOS / Linux の例:

```sh
127.0.0.1 idp.local
127.0.0.1 rp.local
```

Windows の hosts ファイルは通常 `C:\Windows\System32\drivers\etc\hosts` です。

設定後、名前解決できることを確認します。

```sh
ping -c 1 idp.local
ping -c 1 rp.local
```

## 4. 依存関係をインストールする

```sh
make install
```

## 5. アプリを起動する

IdP と RP をまとめて起動します。

```sh
make dev
```

起動後、ブラウザで以下にアクセスします。

- `https://idp.local:3000`
- `https://rp.local:3001`

## 補足

`dev:local` は次の環境変数を指定して Hono アプリを起動します。

- `PORT`: 起動ポート
- `HOSTNAME`: listen するホスト名
- `HTTPS_CERT_FILE`: mkcert で発行した証明書
- `HTTPS_KEY_FILE`: mkcert で発行した秘密鍵

通常の HTTP 起動が必要な場合は、各ディレクトリで `npm run dev` を実行します。

初回セットアップをまとめて実行したい場合は、次のコマンドを使えます。

```sh
make setup
```

`make setup` は `npm install`、`mkcert -install`、証明書発行を順に実行します。
hosts の設定は OS によって編集方法が異なるため、手動で設定してください。
