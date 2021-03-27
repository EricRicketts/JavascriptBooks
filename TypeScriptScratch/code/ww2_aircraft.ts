type Armament = [number, string];
type BoostTechnology = 'turbocharger' | 'supercharger';
type PistonLayout = 'v' | 'radial';
type EngineCooling = 'liquid' | 'air';

type Engine = {
  pistonLayout: PistonLayout,
  maximumHorsePower: number,
  manufacturer: string,
  cooling: EngineCooling;
  numberOfCylinders: number,
  boost?: BoostTechnology;
}

type EngineConfiguration = [number, Engine];

type Aircraft = {
  id: number,
  nationality: string,
  manufacturer: string,
  designation: string,
  variant: string;
  operationalDate: Date,
  armament: Armament[];
  engines: EngineConfiguration
  emptyWeight: number
  range: number,
  name?: string,
}

type Fighter = Aircraft & {
  maximumSpeed: number,
  initialClimbRate: number,
  wingLoading: number,
  role: 'fighter'
}

type Bomber = Aircraft & {
  payload: number,
  cruiseSpeed: number,
  crew: number,
  role: 'bomber'
}

type RemovableProperties = 'role' | 'id';
type AllAircraft = Bomber | Fighter;
type AircraftRoles = AllAircraft['role'];
type GetSpecifications<AircraftType> = Omit<AircraftType, RemovableProperties>;

type SelectAircraftType<AircraftType, Role> =
  AircraftType extends { role: Role } ? AircraftType : never;

type Remove<A, B> = A extends B ? never : A;
// this is same definition as this built in TypeScript utility Exclude<A, B>
type FighterInfo = Remove<Fighter, RemovableProperties>;
// type FighterType = Fighter;
// type Extract<A, B> = A extends B ? A : never;
// type FighterType = Fighter | never;
// type FighterType =
//   Fighter extends { role: 'fighter' } ? Fighter : never |
//   Bomber extends { role: 'fighter' } ? Bomber : never;
// type FighterType = SelectAircraftType<Fighter, 'fighter'> |
//   SelectAircraftType<Bomber, 'fighter'>;
// type FighterType = SelectAircraftType<Fighter | Bomber, 'fighter'>
// type FighterType = SelectAircraftType<AllAircraft, 'fighter'>;
// how does this expand?  Remember a conditional of unions is a union of conditionals, so
// declare function createWW2AircraftEntry<Role extends AircraftRoles>
// (role: Role, specifications): AllAircraft;


declare function createWW2AircraftEntry<Role extends AircraftRoles>(
  role: Role,
  specifications: GetSpecifications<Extract<AllAircraft, Role>>
): Extract<AllAircraft, Role>

