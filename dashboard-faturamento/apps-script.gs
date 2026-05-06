// ═══════════════════════════════════════════════════════
//  DRE Planeta Churros — Google Apps Script Backend
//  Cole este código no Apps Script e faça o deploy
// ═══════════════════════════════════════════════════════

const SHEET_NAME = 'dre_dados';

function doGet(e) {
  try {
    const { year, month } = e.parameter;
    const sheet = getOrCreateSheet();
    const result = loadData(sheet, year, month);
    return respond({ ok: true, data: result });
  } catch (err) {
    return respond({ ok: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    if (body.type === 'config') {
      upsertRow(sheet, 'config', '', '', body.config);
    } else {
      const id = `${body.year}-${body.month}-S${body.semana}`;
      upsertRow(sheet, id, body.year, body.month, body.dados);
    }
    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: err.toString() });
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['id', 'year', 'month', 'dados_json', 'updated_at']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function loadData(sheet, year, month) {
  const rows = sheet.getDataRange().getValues();
  const semanas = {};
  let config = null;
  for (let i = 1; i < rows.length; i++) {
    const [id, y, m, json] = rows[i];
    if (id === 'config') {
      try { config = JSON.parse(json); } catch {}
      continue;
    }
    if (String(y) === String(year) && String(m) === String(month)) {
      const sem = id.split('-S')[1];
      try { semanas[sem] = JSON.parse(json); } catch {}
    }
  }
  return { semanas, config };
}

function upsertRow(sheet, id, year, month, dados) {
  const rows = sheet.getDataRange().getValues();
  const json = JSON.stringify(dados);
  const now = new Date().toISOString();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === id) {
      sheet.getRange(i + 1, 4).setValue(json);
      sheet.getRange(i + 1, 5).setValue(now);
      return;
    }
  }
  sheet.appendRow([id, year, month, json, now]);
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
