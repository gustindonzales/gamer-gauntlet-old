import { Doc } from '../../../../convex/_generated/dataModel';

export namespace TournamentTypes {
  export class Get {
    static readonly type = '[TournamentTypes] Get';
    constructor(public listen: boolean = false) {}
  }
}

export namespace Games {
  export class Get {
    static readonly type = '[Games] Get';
    constructor(public listen: boolean = false) {}
  }
}

export namespace Platforms {
  export class Get {
    static readonly type = '[Platforms] Get';
    constructor(public listen: boolean = false) {}
  }
}

export namespace Tournaments {
  export class Create {
    static readonly type = '[Tournaments] Create';
    constructor(public tournament: Doc<'tournaments'>) {}
  }

  export class CreateSuccess {
    static readonly type = '[Tournaments] Create Success';
    constructor(public tournament: Doc<'tournaments'>) {}
  }
}
