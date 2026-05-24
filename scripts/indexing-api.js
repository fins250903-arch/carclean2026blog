import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// サービスアカウントのJSONキーファイルのパス（ダウンロードしたファイルを指定）
const KEY_FILE_PATH = path.resolve('./gi-service-account-key.json');

// Google Indexing APIのスコープ
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

// 認証クライアントを作成
async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
  });
  return auth;
}

// Indexing APIでURLを更新
async function updateUrl(url) {
  const auth = await authenticate();
  const indexing = google.indexing({ version: 'v3', auth });

  const requestBody = {
    url: url,
    type: 'URL_UPDATED', // または 'URL_DELETED' など
  };

  try {
    const response = await indexing.urlNotifications.publish({
      requestBody,
    });
    console.log('URL updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating URL:', error.message);
  }
}

// 使用例: サイトマップからURLを取得して更新（ここでは手動でURLを指定）
const urlsToUpdate = [
  'https://carinteriorcleaning.jp/',
  'https://carinteriorcleaning.jp/blog/',
  // 追加のURLをここに
];

async function main() {
  for (const url of urlsToUpdate) {
    await updateUrl(url);
  }
}

main();