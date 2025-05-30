import React, { useState } from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonCheckbox,
  IonMenu,
  IonList,
  IonMenuToggle,
  IonItemDivider,
  IonSplitPane,
  IonIcon,
} from "@ionic/react";
import { lockClosed, lockOpen, options, list } from "ionicons/icons";
import CipherResult from "../components/CipherResult";
import PossibilityList from "../components/PossibilityList";
import {
  caesarEncrypt,
  caesarDecrypt,
  jejakEncrypt,
  jejakDecrypt,
  highlightIfCommon,
} from "../utils/ciphers";
import SidebarMenu from "../components/SidebarMenu";
import MetodeCaesar from "./Metode_Caesar";
import Penjelasan from "./Penjelasan";

const Home: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('penjelasan');
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [method, setMethod] = useState<"caesar" | "jejak">("caesar");
  const [useKey, setUseKey] = useState(true);
  const [finalResult, setFinalResult] = useState("");
  const [animatedResult, setAnimatedResult] = useState("");
  const [showPossibilities, setShowPossibilities] = useState(false);
  const [allPossibilities, setAllPossibilities] = useState<string[]>([]);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'penjelasan':
        return <Penjelasan/>;

      case 'caesar':
        return <MetodeCaesar />;

      // case 'jejak':
      //   return <p>🧬 <strong>Jejak Cipher</strong> adalah metode khusus yang mengikuti pola tertentu dalam menyusun ulang karakter pada teks.</p>;

      // case 'transposisi':
      //   return <p>🔄 <strong>Transposisi Vertikal & Horizontal</strong> adalah metode yang mengubah posisi karakter berdasarkan baris dan kolom, seperti grid. Ini menata ulang huruf tapi tidak mengubahnya.</p>;

      default:
        return <p>Pilih menu dari sidebar.</p>;
    }
  };

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
    const result =
      method === "caesar"
        ? caesarEncrypt(text, getEffectiveShift())
        : jejakEncrypt(text);
    animateText(result);
  };

  const handleDecrypt = () => {
    const result =
      method === "caesar"
        ? caesarDecrypt(text, getEffectiveShift())
        : jejakDecrypt(text);
    animateText(result);
  };

  const generateAllPossibilities = () => {
    const results: string[] = [];
    for (let i = 1; i < 26; i++) {
      const res =
        method === "caesar" ? caesarDecrypt(text, i) : jejakDecrypt(text);
      results.push(`Shift ${i}: ${highlightIfCommon(res)}`);
    }
    setAllPossibilities(results);
  };

  const toggleShowPossibilities = (checked: boolean) => {
    setShowPossibilities(checked);
    if (checked) generateAllPossibilities();
    else setAllPossibilities([]);
  };
return (
    <IonApp>
      <IonSplitPane contentId="main-content">
        <SidebarMenu onSelectMenu={setSelectedMenu} />

        <IonPage id="main-content">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>🔐 Aplikasi Enkripsi</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            {renderContent()}
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  );
};
export default Home;
