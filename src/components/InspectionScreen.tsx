import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Save, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface InspectionScreenProps {
  onBack: () => void;
  tireId: string;
  onSaveInspection: (inspection: any) => void;
}

export function InspectionScreen({ onBack, tireId, onSaveInspection }: InspectionScreenProps) {
  const [formData, setFormData] = useState({
    tireId,
    brand: '',
    model: '',
    size: '',
    treadDepth: '',
    pressure: '',
    condition: '',
    defects: '',
    observations: '',
    position: '',
    mileage: '',
    vehicleId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inspection = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      inspector: 'Usuário Atual',
    };
    onSaveInspection(inspection);
  };

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <h1>Inspeção de Pneu</h1>
        <div></div>
      </div>

      <div className="flex-1 px-4 py-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Registro de Inspeção
              <Badge variant="outline">{tireId}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleId">ID do Veículo</Label>
                  <Input
                    id="vehicleId"
                    placeholder="Ex: CAM-001, CAR-015"
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({...formData, vehicleId: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marca do Pneu</Label>
                  <Input
                    id="brand"
                    placeholder="Ex: Bridgestone, Michelin, Continental"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    placeholder="Ex: R268 Ecopia, XZE2+ Energy"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Medida</Label>
                  <Input
                    id="size"
                    placeholder="Ex: 295/80 R22.5, 275/80 R22.5"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="position">Posição no Caminhão</Label>
                  <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a posição do pneu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direcional-esquerdo">Direcional Esquerdo</SelectItem>
                      <SelectItem value="direcional-direito">Direcional Direito</SelectItem>
                      <SelectItem value="traseiro-1-externo-esquerdo">1º Eixo Traseiro - Externo Esquerdo</SelectItem>
                      <SelectItem value="traseiro-1-interno-esquerdo">1º Eixo Traseiro - Interno Esquerdo</SelectItem>
                      <SelectItem value="traseiro-1-externo-direito">1º Eixo Traseiro - Externo Direito</SelectItem>
                      <SelectItem value="traseiro-1-interno-direito">1º Eixo Traseiro - Interno Direito</SelectItem>
                      <SelectItem value="traseiro-2-externo-esquerdo">2º Eixo Traseiro - Externo Esquerdo</SelectItem>
                      <SelectItem value="traseiro-2-interno-esquerdo">2º Eixo Traseiro - Interno Esquerdo</SelectItem>
                      <SelectItem value="traseiro-2-externo-direito">2º Eixo Traseiro - Externo Direito</SelectItem>
                      <SelectItem value="traseiro-2-interno-direito">2º Eixo Traseiro - Interno Direito</SelectItem>
                      <SelectItem value="carreta-1-externo-esquerdo">1º Eixo Carreta - Externo Esquerdo</SelectItem>
                      <SelectItem value="carreta-1-interno-esquerdo">1º Eixo Carreta - Interno Esquerdo</SelectItem>
                      <SelectItem value="carreta-1-externo-direito">1º Eixo Carreta - Externo Direito</SelectItem>
                      <SelectItem value="carreta-1-interno-direito">1º Eixo Carreta - Interno Direito</SelectItem>
                      <SelectItem value="carreta-2-externo-esquerdo">2º Eixo Carreta - Externo Esquerdo</SelectItem>
                      <SelectItem value="carreta-2-interno-esquerdo">2º Eixo Carreta - Interno Esquerdo</SelectItem>
                      <SelectItem value="carreta-2-externo-direito">2º Eixo Carreta - Externo Direito</SelectItem>
                      <SelectItem value="carreta-2-interno-direito">2º Eixo Carreta - Interno Direito</SelectItem>
                      <SelectItem value="carreta-3-externo-esquerdo">3º Eixo Carreta - Externo Esquerdo</SelectItem>
                      <SelectItem value="carreta-3-interno-esquerdo">3º Eixo Carreta - Interno Esquerdo</SelectItem>
                      <SelectItem value="carreta-3-externo-direito">3º Eixo Carreta - Externo Direito</SelectItem>
                      <SelectItem value="carreta-3-interno-direito">3º Eixo Carreta - Interno Direito</SelectItem>
                      <SelectItem value="step">Step/Estepe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treadDepth">Profundidade do Sulco (mm)</Label>
                  <Input
                    id="treadDepth"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 12.5 (novo), 4.0 (limite legal)"
                    value={formData.treadDepth}
                    onChange={(e) => setFormData({...formData, treadDepth: e.target.value})}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo legal: 4.0mm para pneus direcionais, 1.6mm para pneus de tração
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pressure">Pressão (PSI)</Label>
                  <Input
                    id="pressure"
                    type="number"
                    placeholder="Ex: 120 (direcional), 110 (tração)"
                    value={formData.pressure}
                    onChange={(e) => setFormData({...formData, pressure: e.target.value})}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Direcional: 110-130 PSI | Tração: 100-120 PSI
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileage">Quilometragem do Veículo</Label>
                  <Input
                    id="mileage"
                    type="number"
                    placeholder="Ex: 180000"
                    value={formData.mileage}
                    onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Estado Geral</Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Avalie o estado do pneu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Bom Estado
                        </div>
                      </SelectItem>
                      <SelectItem value="fair">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          Estado Regular
                        </div>
                      </SelectItem>
                      <SelectItem value="poor">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          Estado Ruim
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defects">Defeitos Identificados</Label>
                <Textarea
                  id="defects"
                  placeholder="Ex: desgaste irregular nos ombros, cortes na banda de rodagem, separação de lonas, bolhas na lateral, etc."
                  value={formData.defects}
                  onChange={(e) => setFormData({...formData, defects: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observações Gerais</Label>
                <Textarea
                  id="observations"
                  placeholder="Ex: necessário verificar alinhamento, recomendar rodízio, pneu adequado para renovação, etc."
                  value={formData.observations}
                  onChange={(e) => setFormData({...formData, observations: e.target.value})}
                />
              </div>

              {formData.condition && (
                <div className="flex items-center gap-2 p-3 rounded-lg border">
                  {getConditionIcon(formData.condition)}
                  <span className={`px-2 py-1 rounded text-sm ${getConditionColor(formData.condition)}`}>
                    {formData.condition === 'good' && 'Pneu em bom estado'}
                    {formData.condition === 'fair' && 'Pneu requer atenção'}
                    {formData.condition === 'poor' && 'Pneu precisa ser substituído'}
                  </span>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Inspeção
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}