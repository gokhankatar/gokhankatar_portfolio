export const useAppTheme = () => {
  const theme = useTheme()
  
  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
  
  const isDark = computed(() => theme.global.current.value.dark)
  
  return {
    toggleTheme,
    isDark
  }
}
