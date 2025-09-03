import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Droplets, Wifi, Clock, Activity } from 'lucide-react'

export default function page() {
  // Static data - replace with API calls later
  const sensorData = {
    moisturePercent: 45,
    rawValue: 2847,
    rssi: -67,
    status: "NORMAL - Moisture OK",
    lastUpdate: "25s ago",
    timestamp: 125340
  }

  const systemData = {
    system: "Soil Moisture Monitor",
    wifi: "Connected",
    ip: "192.168.1.100",
    uptime: 1250,
    freeHeap: 180000
  }

  // Determine status color and icon
  const getStatusColor = (percent) => {
    if (percent < 20) return "destructive"
    if (percent > 80) return "default"
    return "secondary"
  }

  const getStatusText = (percent) => {
    if (percent < 20) return "DRY - Water needed!"
    if (percent > 80) return "WET - Optimal moisture"
    return "NORMAL - Moisture OK"
  }

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const getSignalStrength = (rssi) => {
    if (rssi > -30) return "Excellent"
    if (rssi > -67) return "Good"
    if (rssi > -70) return "Fair"
    return "Weak"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Droplets className="h-10 w-10 text-blue-500" />
            Soil Moisture Monitor
          </h1>
          <p className="text-gray-600">Real-time soil moisture monitoring via LoRa</p>
        </div>

        {/* Status Alert */}
        <Alert className={`${sensorData.moisturePercent < 20 ? 'border-red-200 bg-red-50' : sensorData.moisturePercent > 80 ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
          <Activity className="h-4 w-4" />
          <AlertDescription className="text-lg font-semibold">
            {getStatusText(sensorData.moisturePercent)}
          </AlertDescription>
        </Alert>

        {/* Main Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Moisture Level Card */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Moisture Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-3xl font-bold text-blue-600">
                  {sensorData.moisturePercent}%
                </div>
                <Progress 
                  value={sensorData.moisturePercent} 
                  className="h-3"
                />
                <Badge variant={getStatusColor(sensorData.moisturePercent)} className="text-xs">
                  {getStatusText(sensorData.moisturePercent).split(' - ')[0]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Raw Sensor Value */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Raw Sensor Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">
                {sensorData.rawValue.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-2">ADC Reading</p>
            </CardContent>
          </Card>

          {/* Signal Strength */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Signal Strength
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {sensorData.rssi} dBm
              </div>
              <Badge variant="outline" className="text-xs mt-2">
                {getSignalStrength(sensorData.rssi)}
              </Badge>
            </CardContent>
          </Card>

          {/* Last Update */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last Update
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-gray-800">
                {sensorData.lastUpdate}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Timestamp: {sensorData.timestamp}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
            <CardDescription>LoRa receiver and HTTP server information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">System</p>
                <p className="text-lg font-semibold">{systemData.system}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">WiFi Status</p>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {systemData.wifi}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">IP Address</p>
                <p className="text-lg font-mono">{systemData.ip}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-lg font-semibold">{formatUptime(systemData.uptime)}</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Free Memory</span>
                <span className="text-sm font-mono">{(systemData.freeHeap / 1024).toFixed(1)} KB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}