// Chrome Extension API types
declare namespace chrome {
  namespace tabs {
    interface Tab {
      id?: number;
      url?: string;
      title?: string;
    }

    // Promise version
    function query(queryInfo: {
      active?: boolean;
      currentWindow?: boolean;
    }): Promise<Tab[]>;

    // Callback version
    function query(
      queryInfo: { active?: boolean; currentWindow?: boolean },
      callback: (tabs: Tab[]) => void
    ): void;

    function sendMessage(tabId: number, message: any): Promise<any>;
  }

  namespace runtime {
    function getURL(path: string): string;
  }
}
namespace chrome {
  namespace scripting {
    interface ScriptInjection {
      target: { tabId: number };
      func?: () => void;
      files?: string[];
    }

    function executeScript(injection: ScriptInjection): Promise<any[]>;
  }
}


// Make chrome available globally
declare const chrome: typeof chrome;
