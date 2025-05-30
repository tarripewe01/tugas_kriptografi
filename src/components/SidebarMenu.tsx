// components/SidebarMenu.tsx
import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItemDivider,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { lockClosed, lockOpen, options, list, menu } from "ionicons/icons";

interface SidebarMenuProps {
  onSelectMenu: (menu: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ onSelectMenu }) => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <IonIcon icon={menu} />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemDivider>Navigation</IonItemDivider>

          <IonMenuToggle autoHide={false}>
            <IonItem button onClick={() => onSelectMenu("penjelasan")}>
              <IonIcon icon={options} slot="start" />
              <IonLabel>Penjelasan</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem button onClick={() => onSelectMenu("caesar")}>
              <IonIcon icon={lockClosed} slot="start" />
              <IonLabel>Metode Caesar</IonLabel>
            </IonItem>
          </IonMenuToggle>

          {/* <IonMenuToggle autoHide={false}>
            <IonItem button onClick={() => onSelectMenu("transposisi")}>
              <IonIcon icon={list} slot="start" />
              <IonLabel>Transposisi Vertikal & Horizontal</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle autoHide={false}>
            <IonItem button onClick={() => onSelectMenu("jejak")}>
              <IonIcon icon={lockOpen} slot="start" />
              <IonLabel>Metode Jejak</IonLabel>
            </IonItem>
          </IonMenuToggle> */}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SidebarMenu;
