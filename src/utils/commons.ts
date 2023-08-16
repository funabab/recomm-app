export function initialFromTitleText(name: string | undefined | null) {
  return name
    ?.split(' ')
    .map((name) => name[0])
    .join('')
}
