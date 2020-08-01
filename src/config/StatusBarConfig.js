import React from "react";
import { StatusBar } from "expo-status-bar";

/*
 * Cria componente sem estado p/ configurar a barra de status dos dispositivos
 * - backgroundColor: cor de fundo da barra de status no Android
 * - style: cor de texto da barra de status
 * 
 * Ref.: https://docs.expo.io/versions/latest/sdk/status-bar/
 */
const StatusBarStylized = () => <StatusBar style="light" backgroundColor="#DA552F" />;

export default StatusBarStylized;