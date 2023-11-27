Elaborate on these points:

Classes are declared as they are for reasons.  We want certain class instances
to be immutable.  These are classes that won't change much or should only be
created once and not changed.  A CodingSystem is a good example of this.

Conversely, classes like Patient are going to be captured over a period of time
and as such we didn't want to make it immutable but also didn't want to
introduce complexity such as a 'copyWith' property.  So it's properties are
public.

As opposed to why we don't solely use readonly variables, some methods or
future implementations may want/need to enforce validation and would require
refactoring of readonly member variables.  We went ahead and laid the groundwork
for that effort.

Enums are not used.  This is done because for the values that may be enumerated,
they're also not finite and are subject to change.  We do not want to force a
library upgrade because a string changed and would rather allow the user to
create new instances.  As such, we use classes for type safety.

We're explicitly requiring the user to enter all parameters requested.  That is
to say we're asking for them for a reason and you need to declare your intention
to NOT pass them.