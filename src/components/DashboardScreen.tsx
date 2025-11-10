import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QrCode, FileText, History, LogOut, Plus, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  inspections: any[];
}

export function DashboardScreen({ onNavigate, onLogout, inspections }: DashboardScreenProps) {
  const totalInspections = inspections.length;
  const goodCondition = inspections.filter(i => i.condition === 'good').length;
  const fairCondition = inspections.filter(i => i.condition === 'fair').length;
  const poorCondition = inspections.filter(i => i.condition === 'poor').length;

  const recentInspections = inspections
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <h1>FleetTire Pro</h1>
        <Button variant="ghost" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl">{totalInspections}</p>
                    <p className="text-sm text-muted-foreground">Total de Inspeções</p>
                  </div>
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl text-green-600">{goodCondition}</p>
                    <p className="text-sm text-muted-foreground">Bom Estado</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl text-yellow-600">{fairCondition}</p>
                    <p className="text-sm text-muted-foreground">Atenção</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl text-red-600">{poorCondition}</p>
                    <p className="text-sm text-muted-foreground">Substituir</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => onNavigate('qr')}
                  className="h-16 flex items-center justify-center gap-3"
                  size="lg"
                >
                  <QrCode className="w-6 h-6" />
                  <div className="text-left">
                    <p>Escanear QR Code</p>
                    <p className="text-sm opacity-90">Nova inspeção</p>
                  </div>
                </Button>

                <Button
                  onClick={() => onNavigate('history')}
                  variant="outline"
                  className="h-16 flex items-center justify-center gap-3"
                  size="lg"
                >
                  <History className="w-6 h-6" />
                  <div className="text-left">
                    <p>Ver Histórico</p>
                    <p className="text-sm opacity-70">Todas as inspeções</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inspeções Recentes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Inspeções Recentes</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('history')}>
                Ver todas
              </Button>
            </CardHeader>
            <CardContent>
              {recentInspections.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Nenhuma inspeção registrada ainda</p>
                  <Button onClick={() => onNavigate('qr')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar primeira inspeção
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentInspections.map(inspection => (
                    <div key={inspection.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{inspection.tireId}</Badge>
                        <div>
                          <p className="text-sm">{inspection.brand} {inspection.model}</p>
                          <p className="text-xs text-muted-foreground">
                            {inspection.vehicleId} • {new Date(inspection.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={inspection.condition === 'good' ? 'default' : 
                               inspection.condition === 'fair' ? 'secondary' : 'destructive'}
                      >
                        {inspection.condition === 'good' && 'Bom'}
                        {inspection.condition === 'fair' && 'Regular'}
                        {inspection.condition === 'poor' && 'Ruim'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}