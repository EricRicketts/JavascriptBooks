type Medium = {
  id: number,
  title: string,
  artist: string
}

type TrackInfo = {
  duration: number,
  tracks: number
}

type CD = Medium & TrackInfo & {
  kind: 'cd'
}

type LP = Medium & {
  sides: {
    a: TrackInfo,
    b: TrackInfo
  }
  kind: 'lp'
}

type AllMedia = CD | LP;
type MediaKinds = AllMedia['kind']; // resolves to 'cd' | 'lp'

/*
  We are going to define a function createMedium which operates as follows:
  1.  It takes a MediaKinds
  2.  The second argument is the missing information need to make the desired media type
  3.  The function returns the newly created medium
*/

declare function createMedium<Kind extends MediaKinds>(
  kind: Kind,
  info
): AllMedia;

// the problem with this declaration is that the output, AllMedia, is too wide, we can use a conditional type
// to solve this problem, notice we are cycling through each constituent of the union and seeing if the kind
// we are looking for is present in the union, if so we return the constituent that matches our search, if not
// we return never
type SelectBranch<Branch, Kind> = Branch extends { kind: Kind } ? Branch : never;

// lets use this new conditional to create a type SelectCD, we start with type SelectCD = SelectBranch(AllMedia, 'cd');
// This is the same as: SelectBranch(CD | LP, 'cd'), we can expand this below using the conditional logic
// same as SelectBranch(CD, 'cd') | SelectBranch(LP, 'cd')
type SelectCDTest = ( CD extends { kind: 'cd'} ? CD : never ) | ( LP extends { kind: 'cd' } ? LP : never )
// we can see that the first conditional is always true, while the second conditional is always false
// so the result is CD | never; so in this union since there are two elements, and never can "never happen"
// the union resolves just to CD, we can now update our function declaration
declare function createMediumTwo<Kind extends MediaKinds>(
  kind: Kind,
  info
): SelectBranch<AllMedia, Kind>

type SelectCD = SelectBranch<AllMedia, 'cd'>
type SelectLP = Extract<AllMedia, { kind: 'lp'}>
// Extract<A, B> = A extends B ? A : never;

/*
  Main point here is that we can add other media to our model and the types logic should all still work.  We want to
  focus on model data and model behavior but we do not want to maintain our types PAST THE MODEL.  In other words,
  once we define our types, our preference is for those to stay fixed and just update the model and behavior as
  necessary.  In this case if we add another member to our model, all of our types update automatically
*/

/*
  We are now at the point where we want to handle the "info" parameter in the function, so the first thing to
  establish the properties that we do not need, in this case they are 'id' and 'kind', 'kind' is given in the
  first parameter.  Then what is needed is to select the remaining properties that are needed.
*/
type Removable = 'id' | 'kind'; // what we want to do now is to filter the remaining properties using these
// two properties, that is, if a property is matches 'id' or 'kind' we discard it, otherwise we keep the property
type Remove<A, B> = A extends B ? never : A;  // this conditional type says that if A is a part of B remove it
// otherwise keep it
type CDKeys = keyof CD; // 'id' | 'kind' | 'title' | 'artist' | 'duration' | 'tracks'
type CDInfoKeys = Remove<CDKeys, Removable>; // 'title' | 'artist' | 'duration' | 'tracks'
type CDInfoKeysOne = Exclude<CDKeys, Removable>; // Exclude is built into TypeScript
/*
  Resolving this is quite a lengthy process it is good to show it once:

// Equal to
type CDInfoKeys =
  Remove<'id' | 'description' | 'title' |
  'kind' | 'tracks' | 'duration', 'id' | 'kind'>

// A conditional of a union
// is a union of conditionals
type CDInfoKeys =
  Remove<'id', 'id' | 'kind'> |
  Remove<'description', 'id' | 'kind'> |
  Remove<'title', 'id' | 'kind'> |
  Remove<'kind', 'id' | 'kind'> |
  Remove<'tracks', 'id' | 'kind'> |
  Remove<'duration', 'id' | 'kind'>

// Substitute
type CDInfoKeys =
  ('id' extends 'id' | 'kind' ?
    never : 'id') |
  ('description' extends 'id' | 'kind'
    ? never : 'description') |
  ('title' extends 'id' | 'kind'
    ? never : 'title') |
  ('kind' extends 'id' | 'kind' ? never : 'kind') |
  ('tracks' extends 'id' | 'kind' ? never : 'tracks') |
  ('duration' extends 'id' | 'kind' ? never : 'duration')

// Evaluate
type CDInfoKeys =
  never  |  'description' | 'title' | never |
  'tracks' | 'duration'

// Remove impossible types from the union
type CDInfoKeys =
  'description' | 'title' | 'tracks' | 'duration

The essence of this code is that all of CDKeys is distributed over 'id' | 'kind', so anything other than 'id' | 'kind'
is kept.
*/

/*
  Notice we had to first specify the keys we did not want to keep in type Removable then we had to had to use
  that type to extract the keys we did want to keep.  In essence this can be combined into one mapping operation,
  where we specify the result is all of the keys except the ones we want to exclude.  There is a built in TypeScript
  function for this called Omit
*/
type LPInfoKeys =  Omit<LP, 'id' | 'kind'>;
// we can now finish the function declaration
type GetInfo<Medium> = Omit<Medium, Removable>; // this is a general purpose type for filtering out those properties
// we do not want
declare function createMedium<Kind extends MediaKinds>(
  kind: Kind,
  info: GetInfo<SelectBranch<AllMedia, Kind>>
): SelectBranch<AllMedia, Kind>;