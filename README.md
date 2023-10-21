# slack-sample-deno

環境変数 `ASANA_TOKEN`
を使って[Asana](https://asana.com/)のAPIを利用してプロジェクトをとってくるだけのSlack
botです。

テンプレートとして
[slack-samples/deno-starter-templat](https://github.com/slack-samples/deno-starter-template)
を使いました。

## 前提

- [Deno](https://deno.com/)
- [Slack CLI](https://api.slack.com/automation/quickstart#install-cli)
- `.env`ファイルに`ASANA_TOKEN`の設定がある

## 利用方法

### run

```shellsession
$ slack login
```

```shellsession
$ slack run
```

### test

```shellsession
$ deno task test
```
