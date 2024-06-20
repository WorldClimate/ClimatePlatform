public class LocationData
{
    public string? City { get; set; }
    public LocationInformation? LocationInformation { get; set; }
    public List<Event>? Events { get; set; }

    public string? TableauUrl{ get; set; }

    public RisksAndMitigations? RisksAndMitigations { get; set; }

    public class Event{
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
    }
}

public class LocationInformation {
    public int Population { get; set; }
    public double Altitude{ get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? Description { get; set; }
    public string? History { get; set; }
    public string? Weather { get; set; }
    public List<string>? Industries { get; set; }
}

public class RisksAndMitigations{
    public List<Risk>? Risks { get; set; }
    public List<Mitigation>? Mitigations { get; set; }

    public TopRisk TopRisk{ get; set; }

    public class Risk{
        public DateTime Date { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Url { get; set; }
    }
    public class Mitigation{
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Url { get; set; }
    }
}
    public class TopRisk{
        public string? Name { get; set; }
        public string? Description { get; set; }
    }