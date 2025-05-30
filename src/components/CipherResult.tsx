import React from 'react';
import { IonCard, IonCardContent, IonText } from '@ionic/react';

const CipherResult: React.FC<{ result: string }> = ({ result }) => (
  <IonCard color="light">
    <IonCardContent>
      <IonText color="dark">
        <h2>📄 Hasil:</h2>
        <p
          style={{
            fontSize: '1.2rem',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            letterSpacing: '1px',
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {result}
        </p>
      </IonText>
    </IonCardContent>
  </IonCard>
);

export default CipherResult;