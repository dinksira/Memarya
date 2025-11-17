'use client';

interface ProgressChartProps {
  currentLang: string;
  timeRange?: 'week' | 'month' | 'year';
}

export function ProgressChart({ currentLang, timeRange = 'month' }: ProgressChartProps) {
  // Sample data for different time ranges
  const chartData = {
    week: [
      { day: currentLang === 'am' ? 'ሰኞ' : 'Mon', minutes: 45, lessons: 3 },
      { day: currentLang === 'am' ? 'ማክሰ' : 'Tue', minutes: 60, lessons: 4 },
      { day: currentLang === 'am' ? 'ረቡ' : 'Wed', minutes: 30, lessons: 2 },
      { day: currentLang === 'am' ? 'ሐሙ' : 'Thu', minutes: 75, lessons: 5 },
      { day: currentLang === 'am' ? 'ዓርብ' : 'Fri', minutes: 50, lessons: 3 },
      { day: currentLang === 'am' ? 'ቅዳ' : 'Sat', minutes: 90, lessons: 6 },
      { day: currentLang === 'am' ? 'እሁ' : 'Sun', minutes: 40, lessons: 2 }
    ],
    month: [
      { week: currentLang === 'am' ? '1ኛ ሳም' : 'Week 1', minutes: 320, lessons: 18 },
      { week: currentLang === 'am' ? '2ኛ ሳም' : 'Week 2', minutes: 280, lessons: 16 },
      { week: currentLang === 'am' ? '3ኛ ሳም' : 'Week 3', minutes: 350, lessons: 20 },
      { week: currentLang === 'am' ? '4ኛ ሳም' : 'Week 4', minutes: 400, lessons: 24 }
    ],
    year: [
      { month: currentLang === 'am' ? 'ጥር' : 'Jan', minutes: 1350, lessons: 78 },
      { month: currentLang === 'am' ? 'የካቲ' : 'Feb', minutes: 1420, lessons: 82 },
      { month: currentLang === 'am' ? 'መጋቢ' : 'Mar', minutes: 1280, lessons: 74 },
      { month: currentLang === 'am' ? 'ሚያዚ' : 'Apr', minutes: 1550, lessons: 88 },
      { month: currentLang === 'am' ? 'ግንቦ' : 'May', minutes: 1620, lessons: 92 },
      { month: currentLang === 'am' ? 'ሰኔ' : 'Jun', minutes: 1480, lessons: 84 }
    ]
  };

  const data = chartData[timeRange];
  const maxMinutes = Math.max(...data.map(item => item.minutes));

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">
        {currentLang === 'am' ? 'የትምህርት ጊዜ' : 'Study Time'}
      </h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">
                {item.day || item.week || item.month}
              </span>
              <span className="text-muted-foreground">
                {item.minutes} {currentLang === 'am' ? 'ደቂቃ' : 'min'} • {item.lessons} {currentLang === 'am' ? 'ትምህርቶች' : 'lessons'}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${(item.minutes / maxMinutes) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {currentLang === 'am' ? 'ጠቅላላ የተማረበት ጊዜ' : 'Total Study Time'}
          </span>
          <span className="font-bold text-primary">
            {data.reduce((sum, item) => sum + item.minutes, 0)} {currentLang === 'am' ? 'ደቂቃ' : 'min'}
          </span>
        </div>
      </div>
    </div>
  );
}