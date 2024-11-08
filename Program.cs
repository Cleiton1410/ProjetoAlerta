using System.Data;
using System.Data.SQLite;
using System.Diagnostics;
using System.Net;
using ProjetoAlertaServer;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Servir arquivos estáticos em site

app.UseDefaultFiles();
app.UseStaticFiles();

// Inicializar banco de dados.
// Não precisamos de nada muito complexo então podemos inicializar globalmente assim mesmo
BancoDados db;
try
{
    db = new BancoDados();
}
catch (SQLiteException ex)
{
    Debug.WriteLine("Ocorreu um erro ao abrir banco de dados: " + ex.ToString());
    throw;
}

app.MapGet("/api/version", () => "0.0.1");

// Retornar todos os dados
app.MapGet("/api/listar-todos", async context =>
{
    try
    {
        DataTable data = db.Query("SELECT * FROM dado");
        List<Dado> result = [];
        foreach (DataRow row in data.Rows)
        {
            result.Add(new Dado
            {
                id = row.Field<long>(data.Columns[0]),
                idade = row.Field<long>(data.Columns[1]),
                curso = (Curso)row.Field<long>(data.Columns[2])
            });
        }
        await context.Response.WriteAsJsonAsync(result);
    }
    catch (SQLiteException ex)
    {
        string message = "Ocorreu um erro: " + ex.Message;
        Debug.WriteLine(ex.ToString());
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        await context.Response.WriteAsync(message);
    }
});

app.MapGet("/api/ip", async context => {
    string? ip;
    if (context.Request.Headers["X-Forwarded-For"].Count > 0) {
        ip = context.Request.Headers["X-Forwarded-For"][0];
    } else {
        ip = context.Connection.RemoteIpAddress?.ToString();
    }
    if (ip != null) {
        await context.Response.WriteAsync(ip);
    } else {
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        await context.Response.WriteAsync("Não foi possível encontrar o IP");
    }
});

app.MapPost("/api/cadastro", async (context) => {
    var pessoa = await context.Request.ReadFromJsonAsync<Pessoa>();
    if (pessoa == null) {
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        await context.Response.WriteAsync("Dados Inválidos");
        return;
    }
    long id = await db.InsertDado(pessoa.curso, pessoa.idade);
    await context.Response.WriteAsync(id.ToString());
});

app.Run();



