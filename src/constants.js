// System configuration constants

const SYSTEM_PATHS = {
  INTEL: {
    TURBO: '/sys/devices/system/cpu/intel_pstate/no_turbo',
    PERF: '/sys/devices/system/cpu/intel_pstate/max_perf_pct'
  },
  AMD: {
    TURBO: '/sys/devices/system/cpu/cpufreq/boost',
    PERF_SINGLE: '/sys/devices/system/cpu/cpu0/cpufreq/scaling_governor',
    PERF_ALL: '/sys/devices/system/cpu/cpu*/cpufreq/scaling_governor'
  },
  ARCH_RELEASE: '/etc/arch-release'
};

const CPU_VENDORS = {
  INTEL: 'GenuineIntel',
  AMD: 'AuthenticAMD'
};

const PERFORMANCE_MODES = {
  INTEL: {
    POWER_SAVE: { value: 30, label: 'Power Save' },
    BALANCE: { value: 50, label: 'Balance' },
    PERFORMANCE: { value: 70, label: 'Performance' },
    ULTRA: { value: 100, label: 'Ultra' }
  },
  AMD: {
    POWER_SAVE: { value: 'conservative', label: 'Power Save' },
    BALANCE: { value: 'powersave', label: 'Balance' },
    PERFORMANCE: { value: 'performance', label: 'Performance' },
    ULTRA: { value: 'schedutil', label: 'Ultra' }
  }
};

const UI_CONFIG = {
  CPU_SPEED_UPDATE_INTERVAL: 2000, // milliseconds
  UPDATER_DELAY: 3000 // milliseconds
};

module.exports = {
  SYSTEM_PATHS,
  CPU_VENDORS,
  PERFORMANCE_MODES,
  UI_CONFIG
};
