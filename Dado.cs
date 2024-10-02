using System.Text.Json.Serialization;

namespace ProjetoAlertaServer;

public class Dado
{
    [JsonInclude]
    public int id;
    [JsonInclude]
    public required int idade;
    [JsonInclude]
    public required string curso;
}

public class DadoComplete: Dado
{
}