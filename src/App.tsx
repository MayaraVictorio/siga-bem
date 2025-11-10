import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { QRCodeScreen } from './components/QRCodeScreen';
import { InspectionScreen } from './components/InspectionScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { toast } from 'sonner@2.0.3';

type Screen = 'login' | 'dashboard' | 'qr' | 'inspection' | 'history';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTireId, setCurrentTireId] = useState<string>('');
  const [inspections, setInspections] = useState<any[]>([
    // Dados mock para demonstração - Frota de Caminhões
    {
      id: '1',
      tireId: 'CAM-001-DT1',
      brand: 'Bridgestone',
      model: 'R268 Ecopia',
      size: '295/80 R22.5',
      treadDepth: '12.5',
      pressure: '120',
      condition: 'good',
      defects: '',
      observations: 'Pneu direcional em excelente estado, desgaste uniforme',
      position: 'direcional-esquerdo',
      mileage: '180000',
      vehicleId: 'CAM-001',
      date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 dias atrás
      inspector: 'João Silva'
    },
    {
      id: '2',
      tireId: 'CAM-002-T1E',
      brand: 'Michelin',
      model: 'XZE2+ Energy',
      size: '275/80 R22.5',
      treadDepth: '8.2',
      pressure: '110',
      condition: 'fair',
      defects: 'Desgaste irregular no ombro externo, possível desalinhamento',
      observations: 'Recomendado verificar alinhamento do eixo traseiro',
      position: 'traseiro-1-externo-esquerdo',
      mileage: '320000',
      vehicleId: 'CAM-002',
      date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 dias atrás
      inspector: 'Maria Santos'
    },
    {
      id: '3',
      tireId: 'CAM-003-T2I',
      brand: 'Continental',
      model: 'HSR2',
      size: '275/80 R22.5',
      treadDepth: '3.8',
      pressure: '105',
      condition: 'poor',
      defects: 'Sulco abaixo do limite legal (4mm), desgaste excessivo na banda central',
      observations: 'SUBSTITUIÇÃO IMEDIATA - Limite legal atingido',
      position: 'traseiro-2-interno-direito',
      mileage: '520000',
      vehicleId: 'CAM-003',
      date: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 dias atrás
      inspector: 'Carlos Oliveira'
    },
    {
      id: '4',
      tireId: 'CAM-001-DT2',
      brand: 'Pirelli',
      model: 'FH01 Energy',
      size: '315/80 R22.5',
      treadDepth: '15.2',
      pressure: '125',
      condition: 'good',
      defects: '',
      observations: 'Pneu novo, primeira inspeção após 25.000 km',
      position: 'direcional-direito',
      mileage: '205000',
      vehicleId: 'CAM-001',
      date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 dias atrás
      inspector: 'Ana Costa'
    }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    toast('Login realizado com sucesso!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    toast('Logout realizado com sucesso!');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleQRScanned = (tireId: string) => {
    setCurrentTireId(tireId);
    setCurrentScreen('inspection');
  };

  const handleSaveInspection = (inspection: any) => {
    setInspections(prev => [inspection, ...prev]);
    setCurrentScreen('dashboard');
    toast('Inspeção salva com sucesso!');
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  switch (currentScreen) {
    case 'dashboard':
      return (
        <DashboardScreen
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          inspections={inspections}
        />
      );
    case 'qr':
      return (
        <QRCodeScreen
          onBack={handleBack}
          onQRScanned={handleQRScanned}
        />
      );
    case 'inspection':
      return (
        <InspectionScreen
          onBack={handleBack}
          tireId={currentTireId}
          onSaveInspection={handleSaveInspection}
        />
      );
    case 'history':
      return (
        <HistoryScreen
          onBack={handleBack}
          inspections={inspections}
        />
      );
    default:
      return (
        <DashboardScreen
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          inspections={inspections}
        />
      );
  }
}