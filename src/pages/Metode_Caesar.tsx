import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonTextarea,
  IonCheckbox,
  IonInput,
  IonButton,
} from "@ionic/react";
import {
  caesarEncrypt,
  caesarDecrypt,
  highlightIfCommon,
} from "../utils/ciphers";
import CipherResult from "../components/CipherResult";
import PossibilityList from "../components/PossibilityList";

const MetodeCaesar: React.FC = () => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [useKey, setUseKey] = useState(true);
  const [animatedResult, setAnimatedResult] = useState("");
  const [finalResult, setFinalResult] = useState("");
  const [showPossibilities, setShowPossibilities] = useState(false);
  const [allPossibilities, setAllPossibilities] = useState<string[]>([]);

  const getEffectiveShift = () => (useKey ? shift : 3);

  const animateText = (target: string) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let frame = 0;
    const maxFrames = 10;

    const interval = setInterval(() => {
      const output = target
        .split("")
        .map((c, i) =>
          frame >= maxFrames
            ? c
            : i <= frame
            ? c
            : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");

      setAnimatedResult(output);
      frame++;
      if (frame > target.length + maxFrames) {
        clearInterval(interval);
        setFinalResult(target);
      }
    }, 40);
  };

  const handleEncrypt = () => {
    const result = caesarEncrypt(text, getEffectiveShift());
    animateText(result);
  };

  const handleDecrypt = () => {
    const result = caesarDecrypt(text, getEffectiveShift());
    animateText(result);
  };

  const generateAllPossibilities = () => {
    const results: string[] = [];
    for (let i = 1; i < 26; i++) {
      const res = caesarDecrypt(text, i);
      results.push(`Kunci ${i}: ${highlightIfCommon(res)}`);
    }
    setAllPossibilities(results);
  };

  const toggleShowPossibilities = (checked: boolean) => {
    setShowPossibilities(checked);
    if (checked) generateAllPossibilities();
    else setAllPossibilities([]);
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonLabel position="floating">💬 Masukkan Teks</IonLabel>
            <IonTextarea
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
              placeholder="Ketik teks di sini..."
              rows={3}
            />
          </IonItem>
        </IonCol>

        <IonCol size="12" size-md="6">
          <IonItem>
            <IonLabel>Gunakan Key</IonLabel>
            <IonCheckbox
              checked={useKey}
              onIonChange={(e) => {
                setUseKey(e.detail.checked);
                setShowPossibilities(false);
                setAllPossibilities([]);
              }}
            />
          </IonItem>
        </IonCol>

        {useKey && (
          <IonCol size="12" size-md="6">
            <IonItem>
              <IonLabel position="floating">Shift</IonLabel>
              <IonInput
                type="number"
                value={shift}
                onIonChange={(e) =>
                  setShift(parseInt(e.detail.value!, 10) || 0)
                }
              />
            </IonItem>
          </IonCol>
        )}

        <IonCol size="6">
          <IonButton
            expand="block"
            color="success"
            onClick={handleEncrypt}
            disabled={!text}
          >
            🔒 Enkripsi
          </IonButton>
        </IonCol>
        <IonCol size="6">
          <IonButton
            expand="block"
            color="tertiary"
            onClick={handleDecrypt}
            disabled={!text}
          >
            🔓 Dekripsi
          </IonButton>
        </IonCol>

        <IonCol size="12">
          <IonItem>
            <IonLabel>
              Tampilkan semua kemungkinan jika tidak tahu kunci
            </IonLabel>
            <IonCheckbox
              checked={showPossibilities}
              onIonChange={(e) => toggleShowPossibilities(e.detail.checked!)}
              disabled={!text}
            />
          </IonItem>
        </IonCol>

        {(animatedResult || finalResult) && (
          <IonCol size="12">
            <CipherResult result={animatedResult || finalResult} />
          </IonCol>
        )}

        {showPossibilities && allPossibilities.length > 0 && (
          <IonCol size="12">
            <PossibilityList possibilities={allPossibilities} />
          </IonCol>
        )}
      </IonRow>
    </IonGrid>
  );
};

export default MetodeCaesar;
