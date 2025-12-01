import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Client } from "@microsoft/microsoft-graph-client";
import * as XLSX from "xlsx";

function graph(client, path) {
  return client.api(path).get();
}

export default function DataPage() {
  const { instance } = useMsal();
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);

    try {
      const loginRes = await instance.loginPopup({ scopes: ["User.Read", "Files.Read"] });
      const token = await instance.acquireTokenSilent({
        account: loginRes.account,
        scopes: ["User.Read", "Files.Read"]
      });

      const client = Client.init({
        authProvider: done => done(null, token.accessToken)
      });

      const content = await client.api("/me/drive/root:/REPLACE_WITH_PATH.xlsx:/content").get();

      const buf = await content.arrayBuffer();
      const data = new Uint8Array(buf);
      const wb = XLSX.read(data, { type: "array" });

      const sheet = wb.SheetNames[0];
      const json = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
      setRows(json);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Data Viewer</h1>
      <button onClick={load}>Sign in and Load</button>
      {loading && <p>Loading...</p>}
      {rows && (
        <table border="1" cellPadding="6" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              {Object.keys(rows[0]).map(k => <th key={k}>{k}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {Object.keys(r).map(c => <td key={c}>{r[c]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
