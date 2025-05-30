import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
  IonButton,
  IonCheckbox,
} from "@ionic/react";

// Fungsi buat matriks dari teks dengan kolom tertentu
const createMatrix = (text: string, cols: number) => {
  const matrix: string[][] = [];
  let idx = 0;
  const rows = Math.ceil(text.length / cols);
  for (let r = 0; r < rows; r++) {
    const row: string[] = [];
    for (let c = 0; c < cols; c++) {
      row.push(text[idx] || " "); // pakai spasi jika tidak ada char
      idx++;
    }
    matrix.push(row);
  }
  return matrix;
};

// Enkripsi vertikal: isi baris per baris, baca per kolom
const encryptVertical = (text: string, key: number) => {
  const matrix = createMatrix(text, key);
  let result = "";
  for (let c = 0; c < key; c++) {
    for (let r = 0; r < matrix.length; r++) {
      result += matrix[r][c];
    }
  }
  return { result, matrix };
};

// Dekripsi vertikal: isi kolom per kolom, baca per baris
const decryptVertical = (cipher: string, key: number) => {
  const rows = Math.ceil(cipher.length / key);
  const matrix: string[][] = Array.from({ length: rows }, () =>
    Array(key).fill(" ")
  );

  let idx = 0;
  for (let c = 0; c < key; c++) {
    for (let r = 0; r < rows; r++) {
      matrix[r][c] = cipher[idx++] || " ";
    }
  }

  let result = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < key; c++) {
      result += matrix[r][c];
    }
  }
  return { result, matrix };
};

// Enkripsi horizontal: isi kolom per kolom, baca per baris
const encryptHorizontal = (text: string, key: number) => {
  const cols = Math.ceil(text.length / key);
  const matrix: string[][] = Array.from({ length: key }, () =>
    Array(cols).fill(" ")
  );

  let idx = 0;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < key; r++) {
      matrix[r][c] = text[idx++] || " ";
    }
  }

  let result = matrix.map((row) => row.join("")).join(" ");
  return { result, matrix };
};

// Dekripsi horizontal: isi baris per baris, baca per kolom
const decryptHorizontal = (cipher: string, key: number) => {
  const blocks = cipher.split(" ");
  const cols = blocks[0]?.length || 0;

  const matrix: string[][] = Array.from({ length: key }, () =>
    Array(cols).fill(" ")
  );

  blocks.forEach((block, r) => {
    for (let c = 0; c < cols; c++) {
      matrix[r][c] = block[c] || " ";
    }
  });

  let result = "";
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < key; r++) {
      result += matrix[r][c];
    }
  }

  return { result, matrix };
};

const MetodeTransposisi: React.FC = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState(2);
  const [mode, setMode] = useState<"vertical" | "horizontal">("vertical");
  const [action, setAction] = useState<"encrypt" | "decrypt">("encrypt");
  const [useKey, setUseKey] = useState(true);
  const [result, setResult] = useState("");
  const [matrixResult, setMatrixResult] = useState<string[][]>([]);
  const [allResults, setAllResults] = useState<
    { key: number; result: string; matrix?: string[][] }[]
  >([]);

  const handleProcess = () => {
    if (!text) return;

    if (!useKey) {
      // Generate semua kemungkinan kunci dari 1 sampai panjang teks
      const maxKey = Math.min(text.length, 20); // batas maksimal 20 supaya tidak overload
      const results = [];
      for (let k = 1; k <= maxKey; k++) {
        let resObj;
        if (mode === "vertical") {
          if (action === "encrypt") {
            resObj = encryptVertical(text, k);
          } else {
            resObj = decryptVertical(text, k);
          }
        } else {
          if (action === "encrypt") {
            resObj = encryptHorizontal(text, k);
          } else {
            resObj = decryptHorizontal(text, k);
          }
        }
        results.push({ key: k, result: resObj.result, matrix: resObj.matrix });
      }
      setAllResults(results);
      setResult("");
      setMatrixResult([]);
      return;
    }

    // Jika pakai kunci tertentu biasa saja
    setAllResults([]);

    if (key <= 0) return;

    if (mode === "vertical") {
      if (action === "encrypt") {
        const { result, matrix } = encryptVertical(text, key);
        setResult(result);
        setMatrixResult(matrix);
      } else {
        const { result, matrix } = decryptVertical(text, key);
        setResult(result);
        setMatrixResult(matrix);
      }
    } else {
      if (action === "encrypt") {
        const { result, matrix } = encryptHorizontal(text, key);
        setResult(result);
        setMatrixResult(matrix);
      } else {
        const { result, matrix } = decryptHorizontal(text, key);
        setResult(result);
        setMatrixResult(matrix);
      }
    }
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonLabel position="floating">
              {action === "encrypt" ? "Masukkan teks asli" : "Masukkan teks cipher"}
            </IonLabel>
            <IonTextarea
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
              placeholder="Ketik teks di sini..."
              rows={3}
            />
          </IonItem>
        </IonCol>

        <IonCol size="12">
          <IonItem lines="none">
            <IonLabel>Gunakan kunci</IonLabel>
            <IonCheckbox
              checked={useKey}
              onIonChange={(e) => setUseKey(e.detail.checked)}
            />
          </IonItem>
        </IonCol>

        {useKey && (
          <>
            <IonCol size="6">
              <IonItem>
                <IonLabel position="floating">Kunci (angka)</IonLabel>
                <IonInput
                  type="number"
                  value={key}
                  min={1}
                  onIonChange={(e) => setKey(parseInt(e.detail.value!, 10) || 1)}
                />
              </IonItem>
            </IonCol>

            <IonCol size="6">
              <IonItem>
                <IonLabel>Metode</IonLabel>
                <select
                  value={mode}
                  onChange={(e) =>
                    setMode(e.target.value as "vertical" | "horizontal")
                  }
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="vertical">Transposisi Vertikal</option>
                  <option value="horizontal">Transposisi Horizontal</option>
                </select>
              </IonItem>
            </IonCol>
          </>
        )}

        <IonCol size="12" style={{ marginTop: "1rem" }}>
          <IonItem>
            <IonLabel>Aksi</IonLabel>
            <select
              value={action}
              onChange={(e) =>
                setAction(e.target.value as "encrypt" | "decrypt")
              }
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="encrypt">Enkripsi</option>
              <option value="decrypt">Dekripsi</option>
            </select>
          </IonItem>
        </IonCol>

        <IonCol size="12" style={{ marginTop: "1rem" }}>
          <IonButton expand="block" color="primary" onClick={handleProcess}>
            Hasil
          </IonButton>
        </IonCol>

        {/* Hasil untuk kunci tunggal */}
        {result && (
          <IonCol size="12" style={{ marginTop: "1rem" }}>
            <IonItem>
              <IonLabel>Hasil {action === "encrypt" ? "Enkripsi" : "Dekripsi"}</IonLabel>
            </IonItem>
            {useKey && mode === "vertical" && action === "encrypt" ? (
              <pre
                style={{
                  backgroundColor: "#eee",
                  padding: "1rem",
                  fontFamily: "monospace",
                  whiteSpace: "pre",
                  marginTop: "0.5rem",
                }}
              >
                {matrixResult.map((row) => row.join(" ")).join("\n")}
              </pre>
            ) : (
              <p style={{ marginTop: "0.5rem", fontFamily: "monospace" }}>{result}</p>
            )}
          </IonCol>
        )}

        {/* Hasil untuk semua kemungkinan kunci */}
        {allResults.length > 0 && (
          <IonCol size="12" style={{ marginTop: "1rem" }}>
            <IonLabel>
              Hasil Semua Kemungkinan Kunci (1 sampai {allResults.length})
            </IonLabel>
            <div
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                backgroundColor: "#fafafa",
                border: "1px solid #ccc",
                padding: "0.5rem",
                marginTop: "0.5rem",
                fontFamily: "monospace",
                color:'#000'
              }}
            >
              {allResults.map(({ key, result }) => (
                <div key={key} style={{ marginBottom: "1rem" }}>
                  <b>Kunci {key}:</b> <br />
                  {result}
                </div>
              ))}
            </div>
          </IonCol>
        )}
      </IonRow>
    </IonGrid>
  );
};

export default MetodeTransposisi;
