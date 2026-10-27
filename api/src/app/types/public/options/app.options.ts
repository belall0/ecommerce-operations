export class AppOptions {
  public nodeEnv = process.env.NODE_ENV ?? 'development';
  public createDefaultAdmin = process.env.CREATE_DEFAULT_ADMIN !== 'false';
  public dbUrl =
    this.nodeEnv === 'test'
      ? (process.env.TEST_DB_URL ??
        'mongodb://localhost:27017/ecommerce-operations-test')
      : (process.env.DB_URL ??
        'mongodb://localhost:27017/ecommerce-operations');
}
