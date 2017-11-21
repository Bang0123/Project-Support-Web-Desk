export class Authuser {
  /**
     * From OpenID.
     */
  public userName: string;

  public email: string;

  /**
   * Identity resource added in Config.cs.
   */
  public roles: string[];
}
