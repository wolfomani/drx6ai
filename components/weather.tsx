"use client"

interface WeatherProps {
  weatherAtLocation?: any
}

export function Weather({ weatherAtLocation }: WeatherProps) {
  if (!weatherAtLocation) {
    return <div className="p-4 border rounded-lg">جاري تحميل بيانات الطقس...</div>
  }

  return (
    <div className="p-4 border rounded-lg bg-card">
      <h3 className="font-semibold mb-2">معلومات الطقس</h3>
      <p className="text-sm text-muted-foreground">{JSON.stringify(weatherAtLocation, null, 2)}</p>
    </div>
  )
}
