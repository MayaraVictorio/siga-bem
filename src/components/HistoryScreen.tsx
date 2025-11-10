import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowLeft, Search, Calendar, User, MapPin, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface HistoryScreenProps {
  onBack: () => void;
  inspections: any[];
}

export function HistoryScreen({ onBack, inspections }: HistoryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInspections = inspections.filter(inspection =>
    inspection.tireId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inspection.vehicleId && inspection.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'fair': return <AlertTriangle className="w-4 h-4" />;
      case 'poor': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPosition = (position: string) => {
    const positions: { [key: string]: string } = {
      'direcional-esquerdo': 'Dir. Esq.',
      'direcional-direito': 'Dir. Dir.',
      'traseiro-1-externo-esquerdo': '1ºT Ext. Esq.',
      'traseiro-1-interno-esquerdo': '1ºT Int. Esq.',
      'traseiro-1-externo-direito': '1ºT Ext. Dir.',
      'traseiro-1-interno-direito': '1ºT Int. Dir.',
      'traseiro-2-externo-esquerdo': '2ºT Ext. Esq.',
      'traseiro-2-interno-esquerdo': '2ºT Int. Esq.',
      'traseiro-2-externo-direito': '2ºT Ext. Dir.',
      'traseiro-2-interno-direito': '2ºT Int. Dir.',
      'carreta-1-externo-esquerdo': '1ºC Ext. Esq.',
      'carreta-1-interno-esquerdo': '1ºC Int. Esq.',
      'carreta-1-externo-direito': '1ºC Ext. Dir.',
      'carreta-1-interno-direito': '1ºC Int. Dir.',
      'carreta-2-externo-esquerdo': '2ºC Ext. Esq.',
      'carreta-2-interno-esquerdo': '2ºC Int. Esq.',
      'carreta-2-externo-direito': '2ºC Ext. Dir.',
      'carreta-2-interno-direito': '2ºC Int. Dir.',
      'carreta-3-externo-esquerdo': '3ºC Ext. Esq.',
      'carreta-3-interno-esquerdo': '3ºC Int. Esq.',
      'carreta-3-externo-direito': '3ºC Ext. Dir.',
      'carreta-3-interno-direito': '3ºC Int. Dir.',
      'step': 'Step'
    };
    return positions[position] || position;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1>Histórico de Inspeções</h1>
        <div></div>
      </div>

      <div className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Inspeções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por ID do pneu, veículo, marca ou modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredInspections.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">
                    {inspections.length === 0 
                      ? 'Nenhuma inspeção registrada ainda.'
                      : 'Nenhuma inspeção encontrada para os critérios de busca.'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredInspections.map((inspection, index) => (
                <Card key={inspection.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="outline" className="font-mono">
                            {inspection.tireId}
                          </Badge>
                          {inspection.vehicleId && (
                            <Badge variant="secondary">
                              {inspection.vehicleId}
                            </Badge>
                          )}
                          <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${getConditionColor(inspection.condition)}`}>
                            {getConditionIcon(inspection.condition)}
                            <span>
                              {inspection.condition === 'good' && 'Bom Estado'}
                              {inspection.condition === 'fair' && 'Estado Regular'}
                              {inspection.condition === 'poor' && 'Estado Ruim'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div>
                            <p><span className="text-muted-foreground">Marca:</span> {inspection.brand}</p>
                            <p><span className="text-muted-foreground">Modelo:</span> {inspection.model}</p>
                            <p><span className="text-muted-foreground">Medida:</span> {inspection.size}</p>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Posição:</span>
                              <span>{formatPosition(inspection.position)}</span>
                            </div>
                            <p><span className="text-muted-foreground">Sulco:</span> {inspection.treadDepth}mm</p>
                            <p><span className="text-muted-foreground">Pressão:</span> {inspection.pressure} PSI</p>
                          </div>
                        </div>

                        {inspection.defects && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm">
                              <span className="text-muted-foreground">Defeitos:</span> {inspection.defects}
                            </p>
                          </div>
                        )}

                        {inspection.observations && (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-blue-800 text-sm">
                              <span className="text-muted-foreground">Observações:</span> {inspection.observations}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1 sm:text-right">
                        <div className="flex items-center gap-1 sm:justify-end">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(inspection.date)}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:justify-end">
                          <User className="w-3 h-3" />
                          <span>{inspection.inspector}</span>
                        </div>
                        {inspection.mileage && (
                          <p><span>KM:</span> {Number(inspection.mileage).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {filteredInspections.length > 0 && (
            <Card>
              <CardContent className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  Mostrando {filteredInspections.length} de {inspections.length} inspeções
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}