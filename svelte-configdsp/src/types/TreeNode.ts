  // Function to parse XML into a tree structure
  export interface TreeNode {
    name: string;
    text: string;
    type: string;
    id: string;
    value: string;
    readonly: boolean;
    vartype: string;
    attributes: Record<string, string>;
    children: TreeNode[];
  }