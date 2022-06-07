import { Injectable } from "@angular/core";
import { KeyValue, KeyValuePipe } from "@angular/common";


@Injectable()
 export class EnumHelper {

    constructor(private keyValuePipe: KeyValuePipe) { }

    private getPredicate(item: KeyValue<string, string>, value: string): boolean {
        return (
            item?.value?.replace(/\s/g, '').toLocaleLowerCase() ===
            value?.replace(/\s/g, '').toLocaleLowerCase() ||
            item.key.toLocaleLowerCase() === value?.toLocaleLowerCase()
        );
    }

    public getTransform<TEnum>(enumValue: TEnum, value: string): KeyValue <string, TEnum> {
        return this.keyValuePipe.transform(enumValue).find((item) => this.getPredicate(item, value));
    }
}
