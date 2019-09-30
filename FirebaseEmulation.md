It seems Firebase Storage cannot be emulated on WSL, which our team heavily depends on.

Hosting can be simulated with ``npm run serve``

I am refactoring ``functions`` to determine enviroment. If it's in a dev enviroment, it own't use the firebase API.

Storage can be emulated by storing files (for development, 5MB) in RAM.

To simulate functions

``cd functions``

``tsc``

``node lib/server.ts``

When deployed to firebase, the code will have to be refactored.