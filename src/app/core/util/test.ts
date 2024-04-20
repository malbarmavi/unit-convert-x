export abstract class Test {
  static spy<T, K extends keyof T>(object: T, method: K) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return spyOn<T>(object, method as any) as jasmine.Spy<any>;
  }
}
