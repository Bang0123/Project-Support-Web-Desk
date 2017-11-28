export class Authuser {
  /**
     * From OpenID.
     */
  public userName: string;

  public email: string;

  public firstName: string;
  public lastName: string;

  /**
   * Identity resource added in Config.cs.
   */
  public roles: string[];
}
