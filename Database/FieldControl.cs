using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Drag_Drop_Controls.Database
{
    [Table("FieldControl")]
    public partial class FieldControl
    {
        [Key]
        public int Id { get; set; }
        [Column("height")]
        public double Height { get; set; }
        [Column("width")]
        public double Width { get; set; }
        [Column("top")]
        public double Top { get; set; }
        [Column("left")]
        public double Left { get; set; }
    }
}
