export abstract class Test {
  static spy<T, K extends keyof T>(object: T, method: K) {
    return spyOn<T>(object, method as any) as jasmine.Spy<any>;
  }
}
