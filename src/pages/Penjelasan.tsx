// pages/Penjelasan.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';

const Penjelasan: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Penjelasan Enkripsi & Dekripsi</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonText>
                <h2>🔐 Apa itu Enkripsi?</h2>
                <p>
                  Enkripsi adalah proses mengubah data atau pesan asli menjadi bentuk yang tidak dapat 
                  dimengerti oleh pihak yang tidak berwenang. Tujuannya adalah menjaga kerahasiaan informasi agar 
                  hanya dapat dibaca oleh penerima yang memiliki kunci rahasia untuk mendekripsinya.
                </p>
                <p>
                  Contohnya, saat Anda mengirim pesan rahasia, enkripsi akan mengacak isi pesan tersebut sehingga 
                  jika pesan tersebut dicegat oleh orang lain, mereka tidak bisa membacanya tanpa kunci.
                </p>
              </IonText>
            </IonCol>

            <IonCol size="12">
              <IonText>
                <h2>🔓 Apa itu Dekripsi?</h2>
                <p>
                  Dekripsi adalah proses mengubah data terenkripsi kembali ke bentuk aslinya agar dapat dipahami. 
                  Proses ini hanya dapat dilakukan oleh pihak yang memiliki kunci rahasia yang sesuai.
                </p>
                <p>
                  Jadi, jika enkripsi mengacak pesan, dekripsi adalah kunci untuk mengembalikan pesan tersebut ke 
                  bentuk yang bisa dimengerti oleh penerima.
                </p>
              </IonText>
            </IonCol>

            <IonCol size="12">
              <IonText>
                <h2>⚙️ Cara Kerja Enkripsi dan Dekripsi</h2>
                <p>
                  Umumnya, enkripsi dan dekripsi menggunakan algoritma matematika dan kunci rahasia. Ada dua jenis utama:
                </p>
                <ul>
                  <li><strong>Enkripsi Simetris:</strong> Kunci yang sama digunakan untuk enkripsi dan dekripsi.</li>
                  <li><strong>Enkripsi Asimetris:</strong> Menggunakan pasangan kunci publik dan privat, kunci publik untuk enkripsi dan kunci privat untuk dekripsi.</li>
                </ul>
                <p>
                  Contoh sederhana: Caesar Cipher (yang digunakan pada aplikasi ini) adalah enkripsi simetris di mana 
                  setiap huruf digeser sejumlah tertentu dalam alfabet.
                </p>
              </IonText>
            </IonCol>

            <IonCol size="12">
              <IonText>
                <h2>📌 Pentingnya Enkripsi</h2>
                <p>
                  Enkripsi sangat penting untuk keamanan data, terutama dalam komunikasi digital, seperti email, transaksi 
                  perbankan online, dan penyimpanan data sensitif. Dengan enkripsi, informasi pribadi dan rahasia terlindungi dari 
                  akses tidak sah.
                </p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Penjelasan;
