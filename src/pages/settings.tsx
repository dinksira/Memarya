import { useState } from 'react';
import { DashboardHeader } from '../components/dashboard-header';
import { Sidebar } from '../components/sidebar';

interface SettingsProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigation?: (page: string) => void;
  activePage?: string;
}

export function Settings({ currentLang, onLanguageChange, t, onNavigation, activePage = 'settings' }: SettingsProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    // Language & Region
    language: currentLang,
    timezone: 'Africa/Addis_Ababa',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    lessonReminders: true,
    challengeUpdates: true,
    achievementAlerts: true,
    weeklyProgress: true,
    
    // Learning Preferences
    dailyGoal: 30, // minutes
    difficulty: 'adaptive',
    autoPlayAudio: true,
    showTransliteration: true,
    showEnglishTranslation: true,
    
    // Privacy & Account
    profileVisibility: 'public',
    dataSharing: true,
    deleteAccountAfter: 'never',
    
    // Appearance
    theme: 'system',
    fontSize: 'medium',
    reduceAnimations: false,
    highContrast: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // Handle language change separately
    if (key === 'language') {
      onLanguageChange(value);
    }
  };

  const timezones = [
    { value: 'Africa/Addis_Ababa', label: { am: 'East Africa Time (EAT)', en: 'East Africa Time (EAT)' } },
    { value: 'Europe/London', label: { am: 'Greenwich Mean Time (GMT)', en: 'Greenwich Mean Time (GMT)' } },
    { value: 'America/New_York', label: { am: 'Eastern Time (ET)', en: 'Eastern Time (ET)' } },
    { value: 'America/Los_Angeles', label: { am: 'Pacific Time (PT)', en: 'Pacific Time (PT)' } },
    { value: 'Asia/Dubai', label: { am: 'Gulf Standard Time (GST)', en: 'Gulf Standard Time (GST)' } }
  ];

  const difficulties = [
    { value: 'beginner', label: { am: 'መጀመሪያ', en: 'Beginner' } },
    { value: 'intermediate', label: { am: 'መካከለኛ', en: 'Intermediate' } },
    { value: 'advanced', label: { am: 'ላቀ', en: 'Advanced' } },
    { value: 'adaptive', label: { am: 'ራስን የሚያስተካክል', en: 'Adaptive' } }
  ];

  const themes = [
    { value: 'light', label: { am: 'ብርሃን', en: 'Light' } },
    { value: 'dark', label: { am: 'ጨለማ', en: 'Dark' } },
    { value: 'system', label: { am: 'ከስርአቱ ጋር', en: 'System' } }
  ];

  const fontSizes = [
    { value: 'small', label: { am: 'ትንሽ', en: 'Small' } },
    { value: 'medium', label: { am: 'መካከለኛ', en: 'Medium' } },
    { value: 'large', label: { am: 'ትልቅ', en: 'Large' } },
    { value: 'xlarge', label: { am: 'በጣም ትልቅ', en: 'Extra Large' } }
  ];

  const profileVisibilities = [
    { value: 'public', label: { am: 'የሁሉም', en: 'Public' } },
    { value: 'friends', label: { am: 'የጓደኞች', en: 'Friends Only' } },
    { value: 'private', label: { am: 'ግላዊ', en: 'Private' } }
  ];

  const deleteOptions = [
    { value: 'never', label: { am: 'ፈጽሞ አይሰርዝም', en: 'Never Delete' } },
    { value: '3months', label: { am: 'ከ3 ወር በኋላ', en: 'After 3 Months' } },
    { value: '6months', label: { am: 'ከ6 ወር በኋላ', en: 'After 6 Months' } },
    { value: '1year', label: { am: 'ከ1 ዓመት በኋላ', en: 'After 1 Year' } }
  ];

  const handleExportData = () => {
    // In a real app, this would trigger a data export
    alert(currentLang === 'am' ? 'የትምህርት ውሂብዎ እየተላከ ነው...' : 'Exporting your learning data...');
  };

  const handleDeleteAccount = () => {
    const message = currentLang === 'am' 
      ? 'እርግጠኛ ነዎት? መለያዎ ለማስወገድ? ይህ ተገላቢጦሽ አይደለም!'
      : 'Are you sure? This will permanently delete your account. This action cannot be undone!';
    
    if (confirm(message)) {
      // In a real app, this would delete the account
      alert(currentLang === 'am' ? 'መለያዎ ተሰርዟል' : 'Account deleted successfully');
    }
  };

  const SettingSection = ({ 
    title, 
    description, 
    children 
  }: { 
    title: { am: string; en: string };
    description?: { am: string; en: string };
    children: React.ReactNode;
  }) => (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground mb-2">
          {title[currentLang]}
        </h3>
        {description && (
          <p className="text-muted-foreground text-sm">
            {description[currentLang]}
          </p>
        )}
      </div>
      {children}
    </div>
  );

  const ToggleSetting = ({
    label,
    description,
    checked,
    onChange
  }: {
    label: { am: string; en: string };
    description?: { am: string; en: string };
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <label className="text-sm font-medium text-foreground">
          {label[currentLang]}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description[currentLang]}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${checked ? 'bg-primary' : 'bg-muted'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );

  const SelectSetting = ({
    label,
    description,
    value,
    options,
    onChange
  }: {
    label: { am: string; en: string };
    description?: { am: string; en: string };
    value: string;
    options: Array<{ value: string; label: { am: string; en: string } }>;
    onChange: (value: string) => void;
  }) => (
    <div className="py-3">
      <label className="block text-sm font-medium text-foreground mb-2">
        {label[currentLang]}
      </label>
      {description && (
        <p className="text-xs text-muted-foreground mb-2">
          {description[currentLang]}
        </p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label[currentLang]}
          </option>
        ))}
      </select>
    </div>
  );

  const SliderSetting = ({
    label,
    description,
    value,
    min,
    max,
    step,
    unit,
    onChange
  }: {
    label: { am: string; en: string };
    description?: { am: string; en: string };
    value: number;
    min: number;
    max: number;
    step: number;
    unit: { am: string; en: string };
    onChange: (value: number) => void;
  }) => (
    <div className="py-3">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-foreground">
          {label[currentLang]}
        </label>
        <span className="text-sm text-muted-foreground">
          {value} {unit[currentLang]}
        </span>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mb-3">
          {description[currentLang]}
        </p>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
      />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        currentLang={currentLang}
        t={t}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        onNavigation={onNavigation}
        activePage={activePage}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <DashboardHeader 
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
          t={t}
          userName="ዳዊት"
        />
        
        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {t('settings')}
              </h1>
              <p className="text-muted-foreground">
                {currentLang === 'am' 
                  ? 'የአማርኛ ትምህርትዎን ልምድ ያብጁ' 
                  : 'Customize your Amharic learning experience'
                }
              </p>
            </div>

            {/* Language & Region */}
            <SettingSection
              title={{ am: 'ቋንቋ እና ክልል', en: 'Language & Region' }}
              description={{ am: 'የትምህርት ቋንቋዎን እና የጊዜ ቀጠናዎን ይቀይሩ', en: 'Change your learning language and time zone' }}
            >
              <SelectSetting
                label={{ am: 'ቋንቋ', en: 'Language' }}
                value={settings.language}
                options={[
                  { value: 'en', label: { am: 'እንግሊዝኛ', en: 'English' } },
                  { value: 'am', label: { am: 'አማርኛ', en: 'Amharic' } }
                ]}
                onChange={(value) => handleSettingChange('language', value)}
              />
              
              <SelectSetting
                label={{ am: 'የጊዜ ቀጠና', en: 'Time Zone' }}
                value={settings.timezone}
                options={timezones}
                onChange={(value) => handleSettingChange('timezone', value)}
              />
            </SettingSection>

            {/* Notifications */}
            <SettingSection
              title={{ am: 'ማሳወቂያዎች', en: 'Notifications' }}
              description={{ am: 'የትኛውን ማሳወቂያ መቀበል እንደሚፈልጉ ይምረጡ', en: 'Choose which notifications you want to receive' }}
            >
              <ToggleSetting
                label={{ am: 'የኢሜል ማሳወቂያዎች', en: 'Email Notifications' }}
                description={{ am: 'ወርሃዊ ሪፖርት እና ማሳወቂያዎች', en: 'Monthly reports and announcements' }}
                checked={settings.emailNotifications}
                onChange={(value) => handleSettingChange('emailNotifications', value)}
              />
              
              <ToggleSetting
                label={{ am: 'የመተግበሪያ ማሳወቂያዎች', en: 'Push Notifications' }}
                description={{ am: 'በመተግበሪያው ውስጥ ማሳወቂያዎች', en: 'Notifications within the app' }}
                checked={settings.pushNotifications}
                onChange={(value) => handleSettingChange('pushNotifications', value)}
              />
              
              <ToggleSetting
                label={{ am: 'የትምህርት አስታዋሽ', en: 'Lesson Reminders' }}
                description={{ am: 'ዕለታዊ ትምህርት አስታዋሽ', en: 'Daily lesson reminders' }}
                checked={settings.lessonReminders}
                onChange={(value) => handleSettingChange('lessonReminders', value)}
              />
              
              <ToggleSetting
                label={{ am: 'የስግተት ማሻሻያዎች', en: 'Challenge Updates' }}
                description={{ am: 'አዲስ ስግተቶች እና ውድድሮች', en: 'New challenges and competitions' }}
                checked={settings.challengeUpdates}
                onChange={(value) => handleSettingChange('challengeUpdates', value)}
              />
              
              <ToggleSetting
                label={{ am: 'የምስክር ወረቀት ማሳወቂያዎች', en: 'Achievement Alerts' }}
                description={{ am: 'አዲስ ምስክር ወረቀቶች ሲገኙ', en: 'When you earn new badges' }}
                checked={settings.achievementAlerts}
                onChange={(value) => handleSettingChange('achievementAlerts', value)}
              />
              
              <ToggleSetting
                label={{ am: 'የሳምንት ሪፖርት', en: 'Weekly Progress' }}
                description={{ am: 'የሳምንት ሪፖርት በኢሜል', en: 'Weekly progress report via email' }}
                checked={settings.weeklyProgress}
                onChange={(value) => handleSettingChange('weeklyProgress', value)}
              />
            </SettingSection>

            {/* Learning Preferences */}
            <SettingSection
              title={{ am: 'የትምህርት ምርጫዎች', en: 'Learning Preferences' }}
              description={{ am: 'የትምህርት ልምድዎን ያብጁ', en: 'Customize your learning experience' }}
            >
              <SliderSetting
                label={{ am: 'ዕለታዊ ዒላማ', en: 'Daily Goal' }}
                description={{ am: 'በቀን ለማጥናት የሚፈልጉት ደቂቃዎች', en: 'Minutes you want to study per day' }}
                value={settings.dailyGoal}
                min={5}
                max={120}
                step={5}
                unit={{ am: 'ደቂቃ', en: 'minutes' }}
                onChange={(value) => handleSettingChange('dailyGoal', value)}
              />
              
              <SelectSetting
                label={{ am: 'የትምህርት ደረጃ', en: 'Difficulty Level' }}
                description={{ am: 'የትምህርት ውስብስብነት ደረጃ', en: 'Complexity of learning materials' }}
                value={settings.difficulty}
                options={difficulties}
                onChange={(value) => handleSettingChange('difficulty', value)}
              />
              
              <ToggleSetting
                label={{ am: 'ድምጽ በራስ ሰር ማጫወት', en: 'Auto-play Audio' }}
                description={{ am: 'የድምጽ ክፍሎችን በራስ ሰር ማጫወት', en: 'Automatically play audio segments' }}
                checked={settings.autoPlayAudio}
                onChange={(value) => handleSettingChange('autoPlayAudio', value)}
              />
              
              <ToggleSetting
                label={{ am: 'ትራንስሊተሬሽን አሳይ', en: 'Show Transliteration' }}
                description={{ am: 'አማርኛ ፊደላትን በላቲን ፊደል አሳይ', en: 'Show Amharic letters in Latin script' }}
                checked={settings.showTransliteration}
                onChange={(value) => handleSettingChange('showTransliteration', value)}
              />
              
              <ToggleSetting
                label={{ am: 'የእንግሊዝኛ ትርጉም አሳይ', en: 'Show English Translation' }}
                description={{ am: 'አማርኛ ጽሑፍ ከእንግሊዝኛ ትርጉም ጋር አሳይ', en: 'Show Amharic text with English translation' }}
                checked={settings.showEnglishTranslation}
                onChange={(value) => handleSettingChange('showEnglishTranslation', value)}
              />
            </SettingSection>

            {/* Appearance */}
            <SettingSection
              title={{ am: 'ገጽታ', en: 'Appearance' }}
              description={{ am: 'የመተግበሪያውን ገጽታ ያብጁ', en: 'Customize the app appearance' }}
            >
              <SelectSetting
                label={{ am: 'ገጽታ', en: 'Theme' }}
                value={settings.theme}
                options={themes}
                onChange={(value) => handleSettingChange('theme', value)}
              />
              
              <SelectSetting
                label={{ am: 'የፊደል መጠን', en: 'Font Size' }}
                value={settings.fontSize}
                options={fontSizes}
                onChange={(value) => handleSettingChange('fontSize', value)}
              />
              
              <ToggleSetting
                label={{ am: 'እንቅስቃሴዎችን አሳንስ', en: 'Reduce Animations' }}
                description={{ am: 'የገጽታ እንቅስቃሴዎችን ያሳንሱ', en: 'Reduce visual animations and transitions' }}
                checked={settings.reduceAnimations}
                onChange={(value) => handleSettingChange('reduceAnimations', value)}
              />
              
              <ToggleSetting
                label={{ am: 'High Contrast', en: 'High Contrast' }}
                description={{ am: 'ለተሻለ አብራሪያ ከፍተኛ ኮንትራስት ይጠቀሙ', en: 'Use high contrast for better visibility' }}
                checked={settings.highContrast}
                onChange={(value) => handleSettingChange('highContrast', value)}
              />
            </SettingSection>

            {/* Privacy & Account */}
            <SettingSection
              title={{ am: 'ግላዊነት እና መለያ', en: 'Privacy & Account' }}
              description={{ am: 'የመለያ ማስተማሚያ እና የግላዊነት ቅንብሮች', en: 'Account management and privacy settings' }}
            >
              <SelectSetting
                label={{ am: 'የመገለጫ ታይነት', en: 'Profile Visibility' }}
                description={{ am: 'ማን መገለጫዎን እንደሚያይ', en: 'Who can see your profile' }}
                value={settings.profileVisibility}
                options={profileVisibilities}
                onChange={(value) => handleSettingChange('profileVisibility', value)}
              />
              
              <ToggleSetting
                label={{ am: 'የውሂብ መጋራት', en: 'Data Sharing' }}
                description={{ am: 'የተማሩ ውሂቦችን ለማሻሻል ያጋሩ', en: 'Share learning data to help improve the app' }}
                checked={settings.dataSharing}
                onChange={(value) => handleSettingChange('dataSharing', value)}
              />
              
              <SelectSetting
                label={{ am: 'መለያ ማስወገድ', en: 'Delete Account' }}
                description={{ am: 'ከስንት ጊዜ በኋላ መለያዎ እንዲሰረዝ', en: 'When to automatically delete your account' }}
                value={settings.deleteAccountAfter}
                options={deleteOptions}
                onChange={(value) => handleSettingChange('deleteAccountAfter', value)}
              />
            </SettingSection>

            {/* Data Management */}
            <SettingSection
              title={{ am: 'የውሂብ አስተዳደር', en: 'Data Management' }}
              description={{ am: 'የትምህርት ውሂብዎን ያስተዳድሩ', en: 'Manage your learning data' }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {currentLang === 'am' ? 'ውሂብ ላክ' : 'Export Data'}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentLang === 'am' 
                        ? 'የትምህርት ውሂብዎን እንደ JSON ፋይል ያውርዱ' 
                        : 'Download your learning data as JSON file'
                      }
                    </p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {currentLang === 'am' ? 'ላክ' : 'Export'}
                  </button>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {currentLang === 'am' ? 'መለያ ሰርዝ' : 'Delete Account'}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentLang === 'am' 
                        ? 'መለያዎን እና ሁሉንም ውሂብ ለመንጽ ሙሉ በሙሉ ይሰርዙ' 
                        : 'Permanently delete your account and all data'
                      }
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    {currentLang === 'am' ? 'ሰርዝ' : 'Delete'}
                  </button>
                </div>
              </div>
            </SettingSection>

            {/* App Info */}
            <SettingSection
              title={{ am: 'ስለ መተግበሪያው', en: 'About the App' }}
            >
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{currentLang === 'am' ? 'የመተግበሪያ ስም' : 'App Name'}</span>
                  <span className="font-medium">Memarya</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{currentLang === 'am' ? 'ስሪት' : 'Version'}</span>
                  <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{currentLang === 'am' ? 'መገንቢ' : 'Developer'}</span>
                  <span className="font-medium">Dinksira Elsa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{currentLang === 'am' ? 'መጨረሻ ዝመና' : 'Last Updated'}</span>
                  <span className="font-medium">January 2024</span>
                </div>
              </div>
            </SettingSection>
          </div>
        </main>
      </div>
    </div>
  );
}