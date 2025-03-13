export type Mode = Record<string, string | boolean | undefined>

/**
 *
 * @param cls className
 * @param mods набор модов, работает тот набор, который имеет true значение
 * @param additianal набор дополнительных классов
 * @returns striing
 */
export const cn = (
    cls: string = '',
    mods: Mode = {},
    additianal: Array<string | undefined> = [],
): string =>
    [
        cls,
        ...additianal.filter(Boolean),
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className, value]) => className),
    ].join(' ')
