export class EnumHelper {
  public static enumToDropdownOptions(
    enumValue: Object
  ): { id: number; name: string }[] {
    return (Object.keys(enumValue) as Array<keyof typeof enumValue>)
      .filter(key => isNaN(+key))
      .map((key, index) => ({ id: index, name: key }));
  }
}
