import { CreateTournamentRequest } from '../models';

export namespace TournamentTypes {
  export class Get {
    static readonly type = '[TournamentTypes] Get';
    constructor(public listen: boolean = false) {}
  }
}

export namespace TournamentFormats {
  export class Get {
    static readonly type = '[TournamentFormats] Get';
    constructor(public listen: boolean = false) {}
  }
}

export namespace TournamentStages {
  export class Get {
    static readonly type = '[TournamentStages] Get';
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
  export class Startup {
    static readonly type = '[Tournaments] Startup';
    constructor(public listen: boolean = false) {}
  }

  export class Create {
    static readonly type = '[Tournaments] Create';
    constructor(public tournament: CreateTournamentRequest) {}
  }

  export class CreateSuccess {
    static readonly type = '[Tournaments] Create Success';
    constructor(public tournamentId: string) {}
  }

  export class Get {
    static readonly type = '[Tournaments] Get';
    constructor(
      public tournamentId: string,
      public listen: boolean = false,
    ) {}
  }
}
