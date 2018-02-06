export async function getSheetCell(accessToken, spreadsheetId, range) {
  let userInfoResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );

  return userInfoResponse;
}
