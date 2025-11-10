import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { QrCode, Camera, CheckCircle, ArrowLeft } from 'lucide-react';

interface QRCodeScreenProps {
  onBack: () => void;
  onQRScanned: (tireId: string) => void;
}

export function QRCodeScreen({ onBack, onQRScanned }: QRCodeScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const startScan = () => {
    setIsScanning(true);
    // Simular escaneamento após 2 segundos
    setTimeout(() => {
      const mockTireId = `PNEU-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      setScannedData(mockTireId);
      setIsScanning(false);
    }, 2000);
  };

  const handleContinue = () => {
    if (scannedData) {
      onQRScanned(scannedData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1>Leitura QR Code</h1>
        <div></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <QrCode className="w-6 h-6" />
              Scanner QR Code
            </CardTitle>
            <p className="text-muted-foreground">
              Escaneie o código QR do pneu para iniciar a inspeção
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              {!isScanning && !scannedData && (
                <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}

              {isScanning && (
                <div className="w-48 h-48 border-2 border-primary rounded-lg flex items-center justify-center mb-4 animate-pulse">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="text-primary">Escaneando...</p>
                  </div>
                </div>
              )}

              {scannedData && (
                <div className="w-48 h-48 border-2 border-green-500 rounded-lg flex items-center justify-center mb-4 bg-green-50">
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-green-700">Escaneado!</p>
                    <p className="text-sm text-green-600 mt-1">{scannedData}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {!scannedData && (
                <Button
                  onClick={startScan}
                  disabled={isScanning}
                  className="w-full"
                >
                  {isScanning ? 'Escaneando...' : 'Iniciar Scanner'}
                </Button>
              )}

              {scannedData && (
                <Button onClick={handleContinue} className="w-full">
                  Continuar para Inspeção
                </Button>
              )}

              {scannedData && (
                <Button
                  onClick={() => {
                    setScannedData(null);
                    setIsScanning(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Escanear Novamente
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}